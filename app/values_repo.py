from pathlib import Path
import os

VALUES_ROOT = Path(__file__).parent / "values_files"
REPO_EXTENSIONS = "txt"


class ValuesRepo:
    _values: list[str]
    _storage_path: Path
    name: str

    def __init__(self, name: str) -> None:
        self.name = name
        self._storage_path = VALUES_ROOT / f"{name.lower()}.{REPO_EXTENSIONS}"
        if not self._storage_path.exists():
            os.makedirs(self._storage_path.parent, exist_ok=True)
            self._storage_path.touch()
            self._values = []
        with open(self._storage_path, "rb") as f:
            lines = f.readlines()
            self._values = list({s.decode().strip() for s in lines})

    def values(self) -> list[str]:
        return self._values

    def add(self, value: str) -> None:
        if value not in self._values and value != "" and value != "\n" and not "undefined" in value:
            self._values.append(value)

    def dump(self):
        with open(self._storage_path, "wb") as f:
            f.writelines(
                [f"{s}".strip(" ").encode() for s in set(self._values) if ("undefined" not in s and "\n" != s)]
            )

    def delete(self, value: str) -> None:
        self._values.remove(value.strip())
        with open(self._storage_path, "wb") as f:
            self.dump()
