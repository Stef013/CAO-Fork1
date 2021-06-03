package main;

import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.QuarkusApplication;
import io.quarkus.runtime.annotations.QuarkusMain;
import messaging.Receiver;

@QuarkusMain
public class main {

    public static void main(String... args) {
        Quarkus.run(MyApp.class, args);
    }

    public static class MyApp implements QuarkusApplication {
        Receiver receiver = new Receiver();
        @Override
        public int run(String... args) throws Exception {
            System.out.println("Do startup logic here");
            receiver.listen();
            Quarkus.waitForExit();
            return 0;
        }
    }
}
