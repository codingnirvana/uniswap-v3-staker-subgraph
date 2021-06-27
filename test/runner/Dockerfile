FROM node:14

COPY ./scripts /app/scripts
COPY ./setup-contracts /app/setup-contracts
COPY ./setup-env.sh /app/

WORKDIR /app/
RUN git clone "https://github.com/Uniswap/uniswap-v3-staker.git"

WORKDIR uniswap-v3-staker
RUN yarn install
RUN yarn add uniswap-v3-deploy-plugin

CMD /app/setup-env.sh