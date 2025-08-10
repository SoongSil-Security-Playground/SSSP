# docker build -t my-challenge .
# docker run -d --rm -P --name web-challenge my-challenge
# docker run -d --rm -P --name ttycontainer ttytest

FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get upgrade
RUN apt-get update
RUN apt-get install tini ttyd curl wget net-tools procps bash -y
RUN apt-get install git vim zsh gdb python3 python3-pip netcat unzip -y

########### tools
RUN pip3 install pwntools

########### user setup
RUN useradd -m -s /bin/bash ctfuser
USER ctfuser
WORKDIR /home/ctfuser

########### gdb setup
RUN git clone https://github.com/hugsy/gef.git
RUN git clone https://github.com/scwuaptx/Pwngdb.git

RUN echo "source /root/tools/gef/gef.py\\nsource /root/tools/Pwngdb/pwngdb.py\\nsource /root/tools/Pwngdb/angelheap/gdbinit.py\\n\\ndefine hook-run\\npython\\nimport angelheap\\nangelheap.init_angelheap()\\nend\\nend" >> ~/.gdbinit

########### vim setup
RUN echo "set nu" >> ~/.vimrc
RUN echo "set ts=4" >> ~/.vimrc
RUN echo "set shiftwidth=4" >> ~/.vimrc
RUN echo "if has('persistent_undo')" >> ~/.vimrc
RUN echo "  set undofile" >> ~/.vimrc
RUN echo "  set undodir=$HOME/.vim/undo" >> ~/.vimrc
RUN echo "  endif">> ~/.vimrc

########### Challenge Contents
COPY . /home/ctfuser/
RUN rm /home/ctfuser/Dockerfile


########### Port Randomization
EXPOSE 7681

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["ttyd", "bash"]