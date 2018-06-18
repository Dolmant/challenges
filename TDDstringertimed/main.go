package main

import (
	"errors"
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func Add(numbers string) (int, error) {
	delimiter := ","
	modNumbers := numbers
	if strings.Contains(numbers, "//") {
		delimiter = string(numbers[2])
		modNumbers = numbers[4:]
	}
	if strings.Contains(numbers, "-") {
		re := regexp.MustCompile("-[0-9]*")
		matches := re.FindAllString(modNumbers, -1)
		return 0, errors.New("Negatives not allowed:" + strings.Join(matches, ""))
	}
	counter := 0
	var split []string
	split1 := strings.Split(modNumbers, delimiter)
	if delimiter == "," {
		for _, number1 := range split1 {
			split = append(split, strings.Split(number1, "\n")...)
		}
	} else {
		split = split1
	}
	for _, number := range split {
		if number == "" {
			continue
		}
		inter, err := strconv.Atoi(number)
		if err != nil {
			return 0, err
		}
		if inter > 1000 {
			continue
		}
		counter = counter + inter
	}
	return counter, nil
}

func main() {
	errMain := errors.New("dead")
	test, err := Add("")
	check(err)
	if test != 0 {
		panic(errMain)
	}
	test, err = Add("1")
	check(err)
	if test != 1 {
		panic(errMain)
	}
	test, err = Add("1,4")
	check(err)
	if test != 5 {
		fmt.Println(test)
		panic(errMain)
	}
	test, err = Add("1\n4")
	check(err)
	if test != 5 {
		fmt.Println(test)
		panic(errMain)
	}
	test, err = Add("1\n4,5\n3")
	check(err)
	if test != 13 {
		fmt.Println(test)
		panic(errMain)
	}
	test, err = Add("1,2\n4")
	check(err)
	if test != 7 {
		fmt.Println(test)
		panic(errMain)
	}
	test, err = Add("0,")
	check(err)
	if test != 0 {
		panic(errMain)
	}
	test, err = Add("0\n")
	check(err)
	if test != 0 {
		panic(errMain)
	}
	test, err = Add("//;\n1;4;5;3")
	check(err)
	if test != 13 {
		fmt.Println(test)
		panic(errMain)
	}
	test, err = Add("//;\n1;-4;5;3")
	if err.Error() != "Negatives not allowed:-4" {
		fmt.Println(err.Error())
		fmt.Println(test)
		panic(errMain)
	}
	test, err = Add("//;\n1;-4;5;-3")
	if err.Error() != "Negatives not allowed:-4-3" {
		fmt.Println(err.Error())
		fmt.Println(test)
		panic(errMain)
	}
	test, err = Add("1,2,-3,-4")
	if err.Error() != "Negatives not allowed:-3-4" {
		fmt.Println(err.Error())
		fmt.Println(test)
		panic(errMain)
	}
	fmt.Println("success")
}
