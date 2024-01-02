# capital-gains

build: docker build -t capital-gains -f docker/Dockerfile.app.dev .

entry manually: docker run -it capital-gains:latest
entry from file: docker run -i capital-gains:latest < file.txt