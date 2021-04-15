package Utilities;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.FileHandler;
import java.util.logging.SimpleFormatter;

public class Logging {

    private final java.util.logging.Logger logger =  java.util.logging.Logger.getLogger(this.getClass().getName());


    public void logInfo(String className, String msg) throws IOException {

        FileHandler fh = writeLog();
        logger.info("At: " + getDate() + ", in class: "  + className + ", With msg: " + msg);
        fh.close();
    }

    public void logUserAction(String className, String msg, String user) throws IOException
    {
        FileHandler fh = writeLog();
        logger.info("At: " + getDate() + ", in class: "  + className + ", With msg: " + msg + ", by user: " + user);
        fh.close();
    }

    public void logError(String className, String msg) throws IOException
    {
        FileHandler fh = writeLog();
        logger.severe("At: " + getDate() + ", in class: "  + className + ", With msg: " + msg);
        fh.close();
    }

    public void logWarning(String className, String msg) throws IOException
    {
        FileHandler fh = writeLog();
        logger.warning("At: " + getDate() + ", in class: "  + className + ", With msg: " + msg);
        fh.close();
    }

    public void logDebug(String className, String msg) throws IOException {
        FileHandler fh = writeLog();
        logger.fine("At: " + getDate() + ", in class: "  + className + ", With msg: " + msg);
        fh.close();
    }

    private FileHandler writeLog() throws IOException {
        String desktopPath = System.getProperty("user.home") + "/Desktop";
        FileHandler fh = new FileHandler(desktopPath + "/logs.txt");

        try{


            File yourFile = new File(desktopPath + "/logs.txt");
            yourFile.createNewFile(); // if file already exists will do nothing

            FileOutputStream oFile = new FileOutputStream(yourFile, false);

            logger.addHandler(fh);
            SimpleFormatter formatter = new SimpleFormatter();
            fh.setFormatter(formatter);
            //logger.info("Einde");


        } catch (IOException e) {
            e.printStackTrace();
        }
        return fh;
    }




    private String getDate()
    {
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        return formatter.format(date);
    }
}
