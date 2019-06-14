const os = require('os');
jest.mock('os');
os.homedir.mockReturnValue(__dirname + '/home');

const data = require('../data');

test('read archive', () => {
    expect(data.readArchive()).toEqual({
        "1": {
            "_id": 1,
            "_date": "Tue Jun 11 2019",
            "_timestamp": 1560251441152,
            "description": "Task 1",
            "isStarred": false,
            "boards": [
                "My Board"
            ],
            "_isTask": true,
            "isComplete": true,
            "inProgress": false,
            "priority": "3"
        }
    });
});

test('read storage data', () => {
    expect(data.readStorage()).toEqual(
        {
            "4": {
                "_id": 4,
                "_date": "Sat Jan 26 2019",
                "_timestamp": 1548495012187,
                "description": "Task1",
                "isStarred": false,
                "boards": [
                    "My Board"
                ],
                "_isTask": true,
                "isComplete": false,
                "priority": 1
            },
            "54": {
                "_id": 54,
                "_date": "Mon Feb 04 2019",
                "_timestamp": 1549287909758,
                "description": "Task2",
                "isStarred": false,
                "boards": [
                    "My Board"
                ],
                "_isTask": true,
                "isComplete": false,
                "priority": 1
            },
            "80": {
                "_id": 80,
                "_date": "Tue Feb 12 2019",
                "_timestamp": 1549995381426,
                "description": "Task3",
                "isStarred": false,
                "boards": [
                    "My Board"
                ],
                "_isTask": true,
                "isComplete": false,
                "priority": "1"
            }
        }
    );
});

test('id normalizer', () => {
    var unnormalized = {
        "80": {
            "_id": 80,
            "_date": "Tue Feb 12 2019",
            "_timestamp": 1549995381426,
            "description": "Task3",
            "isStarred": false,
            "boards": [
                "My Board"
            ],
            "_isTask": true,
            "isComplete": false,
            "priority": "1"
        },
        "4": {
            "_id": 4,
            "_date": "Sat Jan 26 2019",
            "_timestamp": 1548495012187,
            "description": "Task1",
            "isStarred": false,
            "boards": [
                "My Board"
            ],
            "_isTask": true,
            "isComplete": false,
            "priority": 1
        },
        "54": {
            "_id": 54,
            "_date": "Mon Feb 04 2019",
            "_timestamp": 1549287909758,
            "description": "Task2",
            "isStarred": false,
            "boards": [
                "My Board"
            ],
            "_isTask": true,
            "isComplete": false,
            "priority": 1
        }
    };

    var normalized = {
        "1": {
            "_id": 1,
            "_date": "Sat Jan 26 2019",
            "_timestamp": 1548495012187,
            "description": "Task1",
            "isStarred": false,
            "boards": [
                "My Board"
            ],
            "_isTask": true,
            "isComplete": false,
            "priority": 1
        },
        "2": {
            "_id": 2,
            "_date": "Mon Feb 04 2019",
            "_timestamp": 1549287909758,
            "description": "Task2",
            "isStarred": false,
            "boards": [
                "My Board"
            ],
            "_isTask": true,
            "isComplete": false,
            "priority": 1
        },
        "3": {
            "_id": 3,
            "_date": "Tue Feb 12 2019",
            "_timestamp": 1549995381426,
            "description": "Task3",
            "isStarred": false,
            "boards": [
                "My Board"
            ],
            "_isTask": true,
            "isComplete": false,
            "priority": "1"
        }
    };

    expect(data.idNormalizer(unnormalized)).toEqual(normalized);
});
