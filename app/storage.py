from pathlib import Path
from fastapi import UploadFile
from .models import FileMetadata
from werkzeug.utils import secure_filename

ROOT = Path(__file__).parent
METADATA_EXTENSION = "json"


class Storage:
    STORAGE_ROOT = ROOT / "storage"

    def __init__(self) -> None:
        self.STORAGE_ROOT.mkdir(parents=True, exist_ok=True)

    @staticmethod
    def list() -> list[FileMetadata]:
        res = []
        for file_path in Storage.STORAGE_ROOT.glob(f"*.{METADATA_EXTENSION}"):
            with open(file_path, "r", encoding="utf8") as buffer:
                res.append(FileMetadata.parse_raw(buffer.read()))
        return res

    @staticmethod
    def upload(file: UploadFile, metadata: FileMetadata):
        assert file.filename is not None
        file.filename = secure_filename(file.filename)
        with open(Storage.STORAGE_ROOT / file.filename, "wb") as buffer:
            buffer.write(file.file.read())
        secure_metadata = metadata.copy(update={"name": file.filename})
        with open(Storage.STORAGE_ROOT / f"{file.filename}.{METADATA_EXTENSION}", "w", encoding="utf8") as buffer:
            buffer.write(secure_metadata.json())

    @staticmethod
    def load_file_meta(file_name: str) -> FileMetadata:
        safe_file_name = secure_filename(file_name)
        file_path = Storage.STORAGE_ROOT / (safe_file_name + f".{METADATA_EXTENSION}")
        with open(file_path, "r", encoding="utf8") as buffer:
            return FileMetadata.parse_raw(buffer.read())

    @staticmethod
    def update_file_metadata(metadata: FileMetadata) -> None:
        assert metadata.name is not None
        safe_filename = secure_filename(metadata.name)
        file_path = Storage.STORAGE_ROOT / (safe_filename + f".{METADATA_EXTENSION}")
        with open(file_path, "w", encoding="utf8") as buffer:
            buffer.write(metadata.json())
