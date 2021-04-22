package Controller;

import Logic.PoliceLogic;
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

        Spark.put("/police/report", ((request, response) -> {

            //Zoeken van een person
            String json;

            try {
                SearchModel personToFind = gson.fromJson(request.body(), SearchModel.class);

                UserModel person = PL.searchPerson(personToFind);

                json = gson.toJson(person);
            } catch (Exception ex) {
                response.status(404);
                json = "Cant find user.";
            }

            return json;
        }));

        Spark.post("/police/report", ((request, response) -> {
            //Aanmaken van een warrant
            String json;

            try {
                SearchModel personToFind = gson.fromJson(request.body(), SearchModel.class);

                boolean result = PL.createWarrant(personToFind);

                json = gson.toJson(result);
            } catch (Exception ex) {
                response.status(404);
                json = "Cant find user.";
            }

            return json;
        }));


    }
}
