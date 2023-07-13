// storage.go

package main

import (
	"encoding/json"
	"io/ioutil"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

type Storage struct {
	storageRoot string
}

func NewStorage() *Storage {
	storageRoot := "storage"
	os.MkdirAll(storageRoot, os.ModePerm)
	return &Storage{storageRoot: storageRoot}
}

func (s *Storage) List() []FileMetadata {
	var files []FileMetadata
	err := filepath.Walk(s.storageRoot, func(path string, info os.FileInfo, err error) error {
		if !info.IsDir() && filepath.Ext(path) == ".json" {
			bytes, err := ioutil.ReadFile(path)
			if err != nil {
				return err
			}
			var file FileMetadata
			json.Unmarshal(bytes, &file)
			files = append(files, file)
		}
		return nil
	})
	if err != nil {
		panic(err)
	}
	return files
}

func (s *Storage) LoadFileMeta(fileName string) (FileMetadata, error) {
	bytes, err := ioutil.ReadFile(filepath.Join(s.storageRoot, fileName))
	if err != nil {
		return FileMetadata{}, err
	}
	var file FileMetadata
	json.Unmarshal(bytes, &file)
	return file, nil
}

func (s *Storage) Upload(c *gin.Context, file *multipart.FileHeader, metadata *FileMetadata) error {
	dst := filepath.Join(s.storageRoot, file.Filename)
	err := c.SaveUploadedFile(file, dst)
	if err != nil {
		return err
	}

	metadata.Name = &file.Filename
	metadataJson, err := json.Marshal(metadata)
	if err != nil {
		return err
	}

	err = ioutil.WriteFile(filepath.Join(s.storageRoot, file.Filename+".json"), metadataJson, os.ModePerm)
	if err != nil {
		return err
	}

	return nil
}
func (s *Storage) UpdateFileMetadata(fileName string, metadata *FileMetadata) error {
	metadata.Name = &fileName
	metadataJson, err := json.Marshal(metadata)
	if err != nil {
		return err
	}

	err = ioutil.WriteFile(filepath.Join(s.storageRoot, fileName+".json"), metadataJson, os.ModePerm)
	if err != nil {
		return err
	}

	return nil
}
