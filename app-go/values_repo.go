// values_repo.go

package main

import (
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

type ValuesRepo struct {
	name        string
	storagePath string
	values      []string
}

func NewValuesRepo(name string) *ValuesRepo {
	storagePath := filepath.Join("values_files", name+".txt")
	os.MkdirAll(filepath.Dir(storagePath), os.ModePerm)
	var values []string
	if _, err := os.Stat(storagePath); err == nil {
		bytes, _ := ioutil.ReadFile(storagePath)
		values = strings.Split(string(bytes), "\n")
		values = values[:len(values)-1]
	}
	return &ValuesRepo{name: name, storagePath: storagePath, values: values}
}

func (v *ValuesRepo) Values() []string {
	return v.values
}

func (v *ValuesRepo) Add(value string) {
	v.values = append(v.values, value)
}

func (v *ValuesRepo) Dump() {
	ioutil.WriteFile(v.storagePath, []byte(strings.Join(v.values, "\n")), os.ModePerm)
}

func (v *ValuesRepo) Delete(value string) {
	var values []string
	for _, v := range v.values {
		if v != value {
			values = append(values, v)
		}
	}
	v.values = values
	v.Dump()
}
