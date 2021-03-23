package Utilities;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Cryptography {

    public String hash(String plainPass)
    {

        try {

            // Call of SHA-256 instance
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            //Create of ByteArray & convert string to byteArray
            byte[] messageDigest = md.digest(plainPass.getBytes());
            // Convert byte array
            BigInteger no = new BigInteger(1, messageDigest);
            // Convert message into hex value
            String hashtext = no.toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        }
        catch (NoSuchAlgorithmException e) {
            System.out.println("Exception thrown"
                    + " for incorrect algorithm: " + e);
            return null;
        }

    }

}
