import json
from fastapi import FastAPI, Response, status

app: FastAPI = FastAPI(
    title="Expense Tracker Rest API.",
    description="The Rest API for the expense tracker application. It runs on port 8080 and is utilized by the frontend.",
    version="0.0.1",
    contact={
        "name": "Aleksandar Hadzhiev",
        "url": "https://github.com/AleksandarHadzhiev",
        "email": "alekshadzhiev12@gmail.com"
    },
    license_info={
        "name":"MIT",
        "url":"https://opensource.org/kicenses/MIT",
    }
)

@app.get(path="/")
def index() -> Response:
    """The index call to the backend, which serves as a lifecheck, to see whether the API is running.
    
    Returns
    -------
        The response is a simple json format containing a key: `message` and value: `The app is running`.
    """
    return Response(content=json.dumps({"message": "The app is running."}), status_code=status.HTTP_200_OK)