# Stonk account project / ReactJs & Node.js / NestJS & PostgresSQL

## Presentation

This project is a `JavaScript/TypeScript` & `ReactJS` & `Node.js/NestJS` & `PostgresSQL` built web application where it is possible to simulate your own bank account by adding expenses and gains. These data are displayed on the dashboard to help the user to visualize his expenses better.

The application is split into 4 major parts at the moment: the login page, the input section, the historic of expenses/gains and the chart of expenses. New features are surely to come yet.

## Architecture

### Front

The front is a `ReactJS` made application. Code is in .jsx format at the moment but it might be possible to convert it into typescript format (.tsx)
There are not many pages and components as they rely on the login page and mainly the homepage.

### Back

The back is made in `NestJS` with a `Postgres` database. They are only 2 entities: Users and Expenses.
A negative expense is an expense and a positive one is a gain so there is no need to create a Gain entity.

## Utilization

### Account/Token

User has to create an account first to have access to the application. When he signs up, he generates a token which is valid for 3 minutes (for development purposes but in a real app, I would propably use 24 hours). If he logs out, the token is deleted.
Refresh token feature is not implemented yet but on roadmap.

All route are guarded by the Authguard, users can not have access to routes if they do not generate a token.
Only the login page is visible for them.

### Input some expenses/gains

After signing in, the user can have access to the application. On the center card, he can enter some data:
* Date : the date selector is a data picker on a calendar
* Type : Expense or Gain
* Category : name of the expense or the gain
* Currency : currency according to the user country
* Amount : amount of the expense/gain (float with 2 decimals)

The ADD button send a POST request to the back which create a row in the database with all the previous input data

### Total amount

This card is the result of all the expenses/gains on the user's account. At the moment, all of them are retrieve but a filter is on my roadmap.

### Account history

The right card is the account history which retrieves all the expenses/gains in the database with a GET request. At the moment, all of them are retrieve but a filter is on my roadmap.
It is possible to delete them if the user made a mistake when adding some data.

### Chart

The left card is a chart displaying all the expenses the user has done. At the moment, all of them are retrieve but a filter is on my roadmap.
It is updating along the Account history card.
I used [Nivo](https://nivo.rocks/) to create this chart.

## Roadmap

* Adding filter for the different cards in order to choose which data the user wants to be displayed
* Allowing user to add monthly expenses/gains
* Styling the application as almost 0 style has been applied
* Showing error on the front side when requests fail
* Creating a presentation page (homepage) ?
* Other features that are not on my mind yet :)

