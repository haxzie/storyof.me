import routes from "next-routes";

export default routes()
    .add("Authentication", "/auth", "auth")
    .add("profile", "/:username");
