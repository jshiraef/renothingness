openssl aes-256-cbc -K $encrypted_ddbcc881fb2d_key -iv $encrypted_ddbcc881fb2d_iv -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

mkdir gh-pages
cd gh-pages
git init
git remote add origin ssh://git@github.com/$TRAVIS_REPO_SLUG.git
git checkout --orphan gh-pages
git pull origin gh-pages

mkdir $TRAVIS_PULL_REQUEST
cd $TRAVIS_PULL_REQUEST
rm -rf *
cp ../../build/* .
cd ..

git config --global user.name "Mocs Arcade"
git config --global user.email "mocsarcade@gmail.com"
git status
git add --all
git commit -m "Deployed $TRAVIS_PULL_REQUEST"
git push origin gh-pages
