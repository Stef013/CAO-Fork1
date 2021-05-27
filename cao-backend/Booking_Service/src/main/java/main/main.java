package main;

public class main {

    public static void main(String[] args) throws InterruptedException
    {

        //Starting the blacklister
        /*
        Quarkusmain Quarkus = new Quarkusmain("QuarkusMain");
        Quarkus.start();

        blackListUtil blacklister = blackListUtil.getInstance();

        //Starting the API
        sparkAPI threadAPI = new sparkAPI("API", blacklister);
        threadAPI.start();

        //Creating the blacklist controller
        blackListController controller = new blackListController("BlackListController");
        controller.start();

        //Let the controller check every minute if a adress on the blacklist can be removed from the blacklist
        ScheduledExecutorService exec = Executors.newScheduledThreadPool(1);
        exec.scheduleAtFixedRate(controller , 0, 1, TimeUnit.MINUTES);*/

    }


}
