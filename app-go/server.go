// server.go

package main

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

var (
	storage     = NewStorage()
	filterRepos = make(map[string]*ValuesRepo)
)

func main() {

	filepath.Walk("./values_files/", func(path string, info os.FileInfo, err error) error {
		if !info.IsDir() && filepath.Ext(path) == ".txt" {
			name := strings.TrimSuffix(filepath.Base(path), ".txt")
			filterRepos[name] = NewValuesRepo(name)
		}
		return nil
	})

	r := gin.Default()

	r.Use(CORSMiddleware())

	r.GET("/files", getFiles)
	r.GET("/files/:file_name", getFile)
	r.GET("/filters", getFilters)
	r.PATCH("/filters/:filter_name", addFilterValue)
	r.DELETE("/filters/:filter_name/:value", deleteFilter)
	r.POST("/files", createUploadFile)
	r.PATCH("/files/:file_name", updateFileMetadata)

	r.Run(":8000")
}

func getFiles(c *gin.Context) {
	files := storage.List()
	c.JSON(http.StatusOK, files)
}

func getFile(c *gin.Context) {
	fileName := c.Param("file_name")
	file, err := storage.LoadFileMeta(fileName)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "File not found"})
		return
	}
	c.JSON(http.StatusOK, file)
}

func getFilters(c *gin.Context) {
	var filters []Filter
	for name, repo := range filterRepos {
		filters = append(filters, Filter{Name: name, Values: repo.Values()})
	}
	c.JSON(http.StatusOK, filters)
}

func addFilterValue(c *gin.Context) {
	filterName := c.Param("filter_name")
	var value FilterValue
	if err := c.ShouldBindJSON(&value); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	filterRepo, ok := filterRepos[filterName]
	if !ok {
		filterRepo = NewValuesRepo(filterName)
		filterRepos[filterName] = filterRepo
	}
	filterRepo.Add(value.Value)
	filterRepo.Dump()
}

func deleteFilter(c *gin.Context) {
	filterName := c.Param("filter_name")
	value := c.Param("value")
	filterRepo, ok := filterRepos[filterName]
	if ok {
		filterRepo.Delete(value)
	}
}

func createUploadFile(c *gin.Context) {
	file, _ := c.FormFile("file")
	rawMetadata := c.PostForm("raw_metadata")

	var metadata FileMetadata
	err := json.Unmarshal([]byte(rawMetadata), &metadata)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = storage.Upload(c, file, &metadata)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"filename": file.Filename})
}

func updateFileMetadata(c *gin.Context) {
	fileName := c.Param("file_name")
	rawMetadata := c.PostForm("raw_metadata")

	var metadata FileMetadata
	err := json.Unmarshal([]byte(rawMetadata), &metadata)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = storage.UpdateFileMetadata(fileName, &metadata)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"metadata": metadata})
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")
		c.Next()
	}
}
