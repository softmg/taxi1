sudo umount /var/www/phonegap/lib/iphone/
sudo rm -rf /var/www/phonegap/lib/iphone/
sudo mkdir /var/www/phonegap/lib/iphone3/
sudo chown alex:alex /var/www/phonegap/lib/iphone3/
ifuse /var/www/phonegap/lib/iphone3/ --root