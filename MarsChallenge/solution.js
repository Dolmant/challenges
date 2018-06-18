// This solution is a direct copy from src/js//app/Pages/TerminalControl/TerminalControlActions.js
// I have mocked most of the files so you may copy this into your chrome console and use something like:
// actionCreators.processInput('1 5\n1 3 N\nLMLM\n1 3 S\nRMRM')
// to run the solution You will see errors OR the result pro

// mock out react components
const logActions = {
    clearLog: () => ({}),
    logWarn: (error) => ({payload: error}),
    logError: (error) => ({payload: error}),
};
const dispatch_mock = (object) => console.log(object.payload);

// Here we make a deliberate choice to put our logic in the action creator
// I would consider other places depending on if I need to handle data streams, cancellation, etc

const types = {
    CLEAR_LOG: 'CLEAR_LOG',
    LOG_ERROR: 'LOG_ERROR',
    LOG_WARN: 'LOG_WARN',
    PROCESSED_INPUT: 'PROCESSED_INPUT',
    PROCESSED_OUTPUT: 'PROCESSED_OUTPUT',
    RAW_INPUT: 'RAW_INPUT',
    RESULT: 'RESULT',
};

const processError = {
    invalid: 'Your input contains invalid characters. Please correct your input',
    length: 'Your input contains less characters than necessary',
    size: 'Your input is the wrong number of lines. Please correct your input',
};

const processWarn = {
    bounds: 'Your instructions will cause the rover to fall off the plateau!',
    collision: 'Your instructions will cause one rover to collide with another!',
};

const headings = ['N', 'E', 'S', 'W'];

const heading_movement = {
    N: {
        x: 0,
        y: 1,
    },
    E: {
        x: 1,
        y: 0,
    },
    S: {
        x: 0,
        y: -1,
    },
    W: {
        x: -1,
        y: 0,
    },
};


// This takes the input after it has been split and checks it is valid
// Only returns errors
const checkValidity = (dispatch, split_input, number_of_rovers) => {
    if (split_input.length !== ((number_of_rovers * 2) + 1)) {
        return dispatch(logActions.logError(processError.size));
    }

    if (split_input[0].length < 3) {
        dispatch(logActions.logError(processError.length));
    }

    // Check for invalid length of current position
    for (let i = 1; i < ((2 * number_of_rovers) + 1); i += 2) {
        if (split_input[i].length < 5) {
            dispatch(logActions.logWarn(processWarn.length));
        }
        // Regex to match any number followed by a space, any number followed by a space, then any valid heading
        if (!split_input[i].match(/^[0-9]+[ ][0-9]+[ ][NSEW]$/)) {
            return dispatch(logActions.logError(processError.invalid));
        }

        // Regex to match the allowed movement characters and nothing else
        if (!split_input[i + 1].match(/^[L|R|M]+$/)) {
            return dispatch(logActions.logError(processError.invalid));
        }
    }
};

const generateOutput = (dispatch, grid_x, grid_y, rover_position, rovers_instructions) => {
    const length = rover_position.length;
    const rover_output = [];

    const checkBounds = (position) => {
        if (position.x > grid_x || position.x < 0 || position.y > grid_y || position.y < 0) {
            dispatch(logActions.logWarn(processWarn.bounds));
        }
    };

    // Check to see if the rovers will crash
    // Requires rover position ({x: number, y: number}) to check and current rover index
    const checkCollision = (position, index) => {
        // We will have already moved some rovers, so we have to check the end position of each moved rover
        for (let i = 0; i < length; i += 1) {
            if (i < index && rover_output[i].x === position.x && rover_output[i].y === position.y) {
                dispatch(logActions.logWarn(processWarn.collision));
            } else if (i > index && rover_position[i].x === position.x && rover_position[i].y === position.y) {
                dispatch(logActions.logWarn(processWarn.collision));
            }
        }
    };

    const rotateRight = (heading) => {
        const index = headings.indexOf(heading);
        if (index === 3) {
            return headings[0];
        }
        return headings[index + 1];
    };

    const rotateLeft = (heading) => {
        const index = headings.indexOf(heading);
        if (index === 0) {
            return headings[3];
        }
        return headings[index - 1];
    };

    const moveRover = (current_position) => {
        const new_position = {
            heading: current_position.heading,
        };
        new_position.x = current_position.x + heading_movement[current_position.heading].x;
        new_position.y = current_position.y + heading_movement[current_position.heading].y;
        return new_position;
    };


    for (let i = 0; i < length; i += 1) {
        // Avoid creating a reference to the rover position
        let current_position = Object.assign({}, rover_position[i]);

        // for each instruction
        rovers_instructions[i].forEach((instruction) => {
            switch (instruction) {
            case 'L':
                current_position.heading = rotateLeft(current_position.heading);
                break;
            case 'M':
                current_position = moveRover(current_position);
                break;
            case 'R':
                current_position.heading = rotateRight(current_position.heading);
                break;
            default:
                break;
            }
            checkBounds(current_position);
            checkCollision(current_position, i);
        });
        rover_output.push(current_position);
    }
    return rover_output;
};

// Hardcoded options
let number_of_rovers = 2;
const strict_input = true;


// This function contains all the logic to solve the given problem
// It will return early if the input is not valid, otherwise it will return a dispatch with the solution.
const actionCreators = {
    processInput: (text_input) => {
        const dispatch = dispatch_mock;

        const split_input = text_input.split('\n');

        // Here we can set the number of rovers if we want the user to be able to enter instructions for multiple
        number_of_rovers = Math.floor((split_input.length - 1) / 2);

        // if we arent strict, then we can process the input data further
        // We can make things eaiser for the user by trimming the leading and trailing whitespace from the inputs
        // We could also remove invalid characters
        if (!strict_input) {
            split_input.forEach((line, index) => {
                split_input[index] = split_input[index].trim();
            });
        }

        const error = checkValidity(dispatch, split_input, number_of_rovers);
        if (error) {
            return error;
        }

        // Now we know that the input is valid, this should correctly capture our data
        const processed_input = split_input.map((line) => {
            if (line.split(' ').length === 1) {
                return line.split('');
            }
            return line.split(' ');
        });

        const grid_x = Number(processed_input[0][0]);
        const grid_y = Number(processed_input[0][1]);

        const rover_positions = [];
        const rovers_instructions = [];

        // Skip the first setup line and process 2 lines at once
        for (let i = 1; i < ((2 * number_of_rovers) + 1); i += 2) {
            rover_positions.push({
                x: Number(processed_input[i][0]),
                y: Number(processed_input[i][1]),
                heading: processed_input[i][2],
            });
            rovers_instructions.push(processed_input[i + 1]);
        }

        // Process instructions
        const output = generateOutput(dispatch, grid_x, grid_y, rover_positions, rovers_instructions);

        // Generate output in the correct format
        const payload = output
            .map((new_rover_position) =>
                `${new_rover_position.x} ${new_rover_position.y} ${new_rover_position.heading}`)
            .join('\n');

        return dispatch(actionCreators.setResult(payload));
    },
    setResult: (payload) => {
        return {
            type: types.RESULT,
            payload,
        };
    },
};
