from pydantic import BaseModel


class DatasetCompareRequest(BaseModel):
    dataset_id: int
    version_1: int
    version_2: int