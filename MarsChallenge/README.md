# Mars Challenge

Implemented both a simple JS solution and a VERY basic react frontend for the challenge.
When you load the project you will find a simple terminal view. Errors with your input will be
shown below.
You can switch screens to a grid view which will load a map of the rovers. Beware, I haven't had time to test this thoroughly - have fun entering grids with 10,000 cells!

You can find a console compaitable version in 'solution.js'
or you can view the solution in the react project in:
src\js\app\Pages\TerminalControl\TerminalControlActions.js

The function is actionCreators.processInput and it takes a single string argument

Assumptions:
1. Correct number of rovers is based on user input (this can be changed)
2. Collisions and boundary violations produce warnings only
3. All positive numbers are valid inputs