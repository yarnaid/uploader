// models.go

package main

import (
	"time"
)

type Filter struct {
	Name   string   `json:"name"`
	Values []string `json:"values"`
}

type FileMetadata struct {
	Name    *string    `json:"name,omitempty"`
	Size    *int       `json:"size,omitempty"`
	Url     *string    `json:"url,omitempty"`
	Source  *string    `json:"source,omitempty"`
	Type    *string    `json:"type,omitempty"`
	Created *time.Time `json:"created,omitempty"`
	Updated *time.Time `json:"updated,omitempty"`
	Tags    *[]Filter  `json:"tags,omitempty"`
}

type FilterValue struct {
	Value string `json:"value"`
}
