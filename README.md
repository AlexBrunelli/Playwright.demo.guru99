# Playwright demo.guru99

Demo of Playwright tests on the page [https://demo.guru99.com/V4/](https://demo.guru99.com/V4/)


## Configuration
in the `.env` file configure the user and password:

```env
BASE_URL=https://demo.guru99.com/V4/
USER=[your_user]
PASSWORD=[your_password]
```

## List of tests

## Test file locations

| Test name            | File path                   | Description                  |                                                    
|----------------------|-----------------------------|-----------------------------------------------------------------------------------|
| Landing page test    | `tests/landingPage.spec.ts` |Verifies that the page title is as expected: Guru99 Bank.
| Reset button test    | `tests/resetButton.spec.ts` |Verifies that the input fields for user and password can be filled, and that  pressing the reset button clears the fields.|







