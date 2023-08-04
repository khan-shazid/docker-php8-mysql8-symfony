* docker-compose up -d --build

* docker exec -it php82-container bash (to enter bash terminal for docker)

* docker-compose run --rm php82-service php bin/console doctrine:database:create #to create database

* ./bin/console cache:clear --env=prod

* docker exec -it mysql8-container bash