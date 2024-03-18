# Petclinic

## Introduction


Please find the following Tests:

| File location                          | Description                                                                                |
|----------------------------------------|--------------------------------------------------------------------------------------------|
| `qa-test-app-e2e/specs/features/owner.spec.ts` | contains the test cases related to owner functionalties                            | 
| `qa-test-app-e2e/specs/features/pet.spec.ts`   | contains the test cases related to pet functionalties                              |

## How to execute test
1. Download the repository - `git clone https://github.com/dilshan5/rnd-qa-assignment-dilshan5-web.git`
2. Navigate to the project - `cd rnd-qa-assignment-dilshan5-web`
3. In the commandline and type - `npm i`
4. Once the installion is complete - ` npx playwright test`

Precondition: You to need to make sure Petclinic service is UP and accessible via http://localhost:8080/

## How to generate allure test report
1. Generate allure report - `npx allure generate ./allure-results --clean`
2. Open the report - `npx allure open ./allure-report ` 

## CI/CD Integration - Gitgub Actions
Naviagate to URL https://github.com/dilshan5/rnd-qa-assignment-dilshan5-web/actions/workflows/petclinic-e2e-tests.yml

