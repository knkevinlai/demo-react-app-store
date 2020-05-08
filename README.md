# README.md

## Available Scripts

In the project directory, you can run:

### `yarn`
Install dependencies

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.<br />

### `yarn serve`

Serve the app for production to the `build` folder.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Bonus Features 👍
- PWA > essential UI skeleton and config
- Dark theme (auto detection + user preference stored in browser's local storage)
- API response schema validation
- Minimum responsive
- Loading indicator UI
- Row scroll-in animation > fade
- Jss-in-Css > better css dynamics in SPA by using Emotion
- React Context API for state management
- Lifecycle with React hooks
- Eslint configured

## Checklist (Essential Features)
1. ✅ App listing, app recommendation, and search
### App Listing
2. ✅ Display top 100 free apps with apps rating
3. ✅ API Data source used
4. ✅ Support vertical scrolling with pagination and lazy load
5. ✅ App icon with round corners for odd row, circle cropped for even row
### App Recommendation
6. ✅ Display top 10 grossing apps
7. ✅ API Data source used
8. ✅ Horizontal scrolling
9. ✅ App icons cropped with round corners
10. ✅ Scroll together with app listing
### Search
11. ✅ Search apps by filtering the matched apps in app listing and recommendation
12. ✅ Sticky top search bar
13. ✅ Only show apps contains keyword in name, category, author, or description
14. ✅ Perform search on typing > Have used lodash debounce to prevent performance issue

## Note 📝
- Using online CORS proxy service "CORS Anywhere" to bypass CORS issue with Apple's API policy
- The ranking of apps from RSS feed of Apple is changing from time to time, so it is possible when scroll to the page 2, the apps in page 1 will be refreshed and modified.
- node.js v10.x and v12.x compatible tested.