package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// Init constructs the server and routes. With a bigger project this might be separated into different files and accept config options
func Init() {
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Authorization", "Content-Length", "Content-Type"}
	router.Use(cors.New(config))
	workingDir, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	router.Use(static.Serve("/", static.LocalFile(workingDir+"/SPA/dist/", true)))

	v1 := router.Group("v1")
	{
		pingerGroup := v1.Group("pinger")
		{
			pingerHandler := new(PingerHandler)
			pingerGroup.GET("/", pingerHandler.Pinger)
		}
		dataGroup := v1.Group("data")
		{
			dataHandler := new(DataHandler)
			dataGroup.GET("/ui", dataHandler.GetUIData)
			dataGroup.POST("/ui", dataHandler.PostUIData)
		}
	}

	router.Run(":8079")
}
