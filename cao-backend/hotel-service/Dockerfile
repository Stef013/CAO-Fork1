FROM maven:3.5-jdk-11 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package -DskipTests

FROM gcr.io/distroless/java:11
COPY --from=build /usr/src/app/target/hotel-service-0.0.1-SNAPSHOT.jar /usr/app/hotel-service-0.0.1-SNAPSHOT.jar
EXPOSE 1001
EXPOSE 80
ENTRYPOINT ["java","-jar","/usr/app/hotel-service-0.0.1-SNAPSHOT.jar"]

