FROM maven:3.5-jdk-11 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package -DskipTests

FROM gcr.io/distroless/java:11
COPY --from=build /usr/src/app/target/Flight_Service-1.0-SNAPSHOT-runner.jar /usr/app/Flight_Service-1.0-SNAPSHOT.jar
EXPOSE 5678
ENTRYPOINT ["java","-jar","/usr/app/Flight_Service-1.0-SNAPSHOT.jar"]