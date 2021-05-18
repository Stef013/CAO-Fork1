package Controller;

import Logic.PoliceLogic;
import Model.FoundPersonModel;
import Model.SearchModel;
import Model.UserModel;
import Utilities.Logging;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Spark;

import java.util.List;

import static spark.Spark.*;

public class PoliceController {

    // private CustomerRepo customerRepo;
    private Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
    PoliceLogic PL = new PoliceLogic();

    Logging logger = new Logging();

    public PoliceController() {

        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        Spark.post("/report", ((request, response) -> {

            // Zoeken van een person
            String json;

            try {
                SearchModel personToFind = gson.fromJson(request.body(), SearchModel.class);

                json = PL.searchPerson(personToFind);

                // json = gson.toJson(person);
            } catch (Exception ex) {
                response.status(404);
                json = "Cant find user.";
            }

            return json;
        }));
    }
}
