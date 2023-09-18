from typing import Annotated
from fastapi import FastAPI, UploadFile, HTTPException, File, Form, status, Request
from fastapi.middleware.cors import CORSMiddleware
from .values_repo import ValuesRepo, VALUES_ROOT, REPO_EXTENSIONS
from .storage import Storage
from .models import Filter, FileMetadata, FilterValue
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
import logging
from datetime import datetime


app = FastAPI()
origins = [
    "*",
    "http://localhost",  # Allow requests from localhost
    "http://localhost:8000",  # Allow requests from localhost:8000
    "http://127.0.0.1:8000",  # Allow requests from localhost:8000
    # Add other origins if needed
]
STORAGE = Storage()


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    exc_str = f"{exc}".replace("\n", " ").replace("   ", " ")
    logging.error(f"{request}: {exc_str}")
    content = {"status_code": 10422, "message": exc_str, "data": None}
    return JSONResponse(content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


FILTER_REPOS: dict[str, ValuesRepo] = {}

for filter_path in VALUES_ROOT.glob(f"*.{REPO_EXTENSIONS}"):
    FILTER_REPOS[filter_path.stem] = ValuesRepo(filter_path.stem)


# Add middleware settings to FastAPI application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/files")
def get_files() -> list[FileMetadata]:
    files = STORAGE.list()
    return files


@app.get("/files/{file_name}")
def get_file(file_name: str) -> FileMetadata:
    try:
        file = STORAGE.load_file_meta(file_name)
        return file
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")


@app.get("/filters")
def get_filters() -> list[Filter]:
    return [Filter(name=name, values=repo.values()) for name, repo in FILTER_REPOS.items()]


@app.patch("/filters/{filter_name}")
def add_filter_value(filter_name: str, value: FilterValue) -> None:
    filter_repo = FILTER_REPOS.get(filter_name, ValuesRepo(filter_name))
    filter_repo.add(f"{value.value}\n")
    filter_repo.dump()
    if filter_repo.name not in FILTER_REPOS:
        FILTER_REPOS[filter_name] = filter_repo


@app.delete("/filters/{filter_name}/{value}")
def delete_filter(filter_name: str, value: str) -> None:
    filter_repo = FILTER_REPOS.get(filter_name, None)
    if filter_repo:
        filter_repo.delete(value)
        # del FILTER_REPOS[value]


@app.post("/files")
async def create_upload_file(
    file: Annotated[UploadFile, File()],
    raw_metadata: Annotated[str, Form()],
):
    metadata = FileMetadata.parse_raw(raw_metadata)
    STORAGE.upload(file, metadata)
    return {"filename": file}


@app.patch("/files/{file_name}")
async def update_file_metadata(
    raw_metadata: Annotated[str, Form()],
):
    metadata = FileMetadata.parse_raw(raw_metadata)
    assert metadata.name is not None
    metadata_stored = STORAGE.load_file_meta(metadata.name)
    updated_metadata = metadata_stored.model_copy(update=metadata.model_dump(exclude_unset=True))
    STORAGE.update_file_metadata(updated_metadata)
    return {"metadata": metadata}
