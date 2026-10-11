

first:
	echo "Dummy target so nothing runs"


startup:
	git pull

build:
	cd ./isa && npm run build


publish:
	cp -r ./circuits ~/public/html/cs252/
	cp -r ./fsm ~/public/html/cs252/
	cp -r ./include ~/public/html/cs252/
	cp -r ./representation ~/public/html/cs252/
	cp -r ./html/riscv ~/public/html/cs252/
	cp ./CS252_Course_Notes.pdf ~/public/html/cs252/CS252_Course_Notes.pdf
	cp ./index.shtml ~/public/html/cs252/index.shtml
	cp ./TODO.html ~/public/html/cs252/TODO.html


clean:
	rm -rf ./html