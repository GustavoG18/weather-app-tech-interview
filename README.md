
# How to Run This Project

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Add OpenWeather Map Key:**
   - Add the OpenWeather Map key to the `.env` file (I've uploaded the file without the environment variable, but I'm providing my key for ease of review. This key will be deactivated in 5 business days):
     ```plaintext
     Key: 'c200828df66f8edb17ce6a6207dcbe12'
     ```

3. **Run the Project:**
   ```bash
   npm run dev
   ```
   The project should be running on port 5173.

In this project, I used React with TypeScript and TailwindCSS for ease of styling the components. Additionally, I used a styling library called `shadcn` for the charts, which internally uses `recharts`. This library leverages the power of `recharts` and adds some styling with TailwindCSS.

Here is the link to the deployed project: [\[Project Link\]](https://weatherapptestinterview.netlify.app/)
