# ==============================================================================
# SMARTCROP AI — SPRING BOOT BACKEND DOCKERFILE
# ==============================================================================

# Stage 1: Build the Spring Boot Application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Package the application JAR without running unit tests
RUN mvn clean package -DskipTests

# Stage 2: Minimal JRE Runtime Container
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Render assigns the port dynamically via $PORT
ENV PORT=8080
EXPOSE 8080

# Launch Spring Boot with dynamic Render port
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]
