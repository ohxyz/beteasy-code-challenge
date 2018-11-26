# BetEasy code challenge

### Demo
http://www.runademo.com/beteasy/

### Development
1. Clone the project
```
git clone https://github.com/ohxyz/beteasy-code-challenge.git
```
2. Go to `beteasy-code-challenge` directory, run
```
npm i
```
3. Start development
```
npm run dev
```

### Test
A dummy server is used for testing purpose. The main testing purpose should cover following 3 cases
1. When server's resource has changed, polling should get the new results.
2. When select a race type, make sure polling will not create a full list of all race types.
3. When a race type is selected, every time it polls, make sure only selected types are displayed.

### Build to production
```
npm run build
```
The `bundle.js` is in `dist` directory. Use a static server e.g.`http-server` (Not included) to view results
```
http-server dist
```