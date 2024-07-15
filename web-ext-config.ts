import {defineRunnerConfig} from "wxt";

export default defineRunnerConfig({
    chromiumArgs: [
        `--profile-directory=\"Default\"`,
        // '--user-data-dir=C:\\Users\\T\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 4'
    ],
    // chromiumProfile: "Profile 4"
});
