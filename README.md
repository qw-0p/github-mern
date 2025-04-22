## About project
This project will be developed using the MERN stack. Test task for the full stack developer position. 
There is not much functionality here because I wanted to meet the target price and had few requirements.
<br />

## How to run
- Clone repository:
```
git clone git@github.com:qw-0p/github-mern.git
```
- Move to the clone folder and run the project using <b>docker-compose</b>
```
cd github-mern
docker-compose up
```
If you don't have Docker installed, it's best to install it, but you can always run without it. <br>
First you need to install all dependencies and run packages:
```
pnpm install
pnpm dev
```
After that, the project will be launched. Local ports (if they are not used): 
- Backend  http://localhost:4000
- Frontend http://localhost:3000

## Possible improvements
<ul>
  <li>Error handler</li>
  <li>Validation</li>
  <li>Mongodb on local cluster</li>
  <li>Reduce the number of queries by caching data</li>
  <li>Notification error</li>
</ul>
