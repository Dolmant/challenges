package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

// PingerHandler contains all the pinger related endpoints
type PingerHandler struct {
}

const pinger = "ping"
const ponger = "pong"

var next = pinger

// Pinger simply retuns ping or pong
func (ctrl PingerHandler) Pinger(c *gin.Context) {

	if next == pinger {
		next = ponger
		c.JSON(http.StatusOK, gin.H{"data": pinger})
		return
	}
	next = pinger
	c.JSON(http.StatusOK, gin.H{"data": ponger})
	return
}

// DataHandler contains all the UI data endpoints
type DataHandler struct {
}

var data = "pinger"

// GetUIData returns the example json structure
func (ctrl DataHandler) GetUIData(c *gin.Context) {
	sampleData, err := ioutil.ReadFile("sampledata.json")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to read the sampledata.json supplied"})
		return
	}

	var sample map[string]interface{}
	err = json.Unmarshal(sampleData, &sample)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad sampledata.json format"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": sample})
	return
}

// PostUIData Returns a success if there is an attribute property in the body
func (ctrl DataHandler) PostUIData(c *gin.Context) {

	var raw map[string]interface{}
	c.BindJSON(&raw)
	if raw["selected"] != nil {
		c.JSON(http.StatusOK, gin.H{"data": "success"})
		return
	}
	c.JSON(http.StatusBadRequest, gin.H{"error": "No selected property found"})
	return
}
