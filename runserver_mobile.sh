# Runs Django server so it can be accessed on mobile.
sudo ufw enable
sudo ufw allow 3000
# Get IP address to use - might not work for other people.
LOCAL_IP="$(ifconfig wlp2s0 | grep -m1 inet | grep -E -o -m1 "([0-9]{1,3}[\.]){3}[0-9]{1,3}" | head -n 1)"
echo Visit "$LOCAL_IP":3000 on your mobile device
yarn start
