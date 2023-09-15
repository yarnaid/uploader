from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class Filter(BaseModel, frozen=True):
    name: str = Field(..., description="The name of the filter.")
    values: list[str] = Field(..., description="The values of the filter.")


class FileMetadata(BaseModel):
    name: Optional[str] = Field(None)
    size: Optional[int] = Field(None)
    type_: Optional[str] = Field(None)
    created_at: Optional[datetime] = Field(None)
    updated_at: Optional[datetime] = Field(None)
    tags: Optional[list[Filter]] = Field(None)


class FilterValue(BaseModel):
    value: str = Field(..., description="The value of the filter.")
