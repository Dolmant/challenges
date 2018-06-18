package main

//go:generate sh -c "cd ./SPA && npm install"
//go:generate sh -c "cd ./SPA && npm run build"

func main() {
	Init()
}
