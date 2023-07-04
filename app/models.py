from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class Filter(BaseModel, frozen=True):
    name: str = Field(..., example="year", description="The name of the filter.")
    values: list[str] = Field(..., example=["2020", "2021"], description="The values of the filter.")


class FileMetadata(BaseModel):
    name: Optional[str]
    size: Optional[int]
    url: Optional[str]
    source: Optional[str]
    type_: Optional[str]
    created: Optional[datetime]
    updated: Optional[datetime]
    tags: Optional[list[Filter]]


class FilterValue(BaseModel):
    value: str = Field(..., example="2020", description="The value of the filter.")
