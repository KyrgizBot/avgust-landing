#!/usr/bin/expect -f
# Deploy script для avgust-landing → REG.RU
# Использование: ./deploy-to-reg.sh

set timeout 30

puts "\n🚀 Деплой на avgust-td.ru (REG.RU)\n"

spawn ssh u3131255@31.31.197.28
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "32P5f7DrqzbLRoES\r" }
}

expect "$ " { 
    puts "\n📂 Переход в директорию сайта..."
    send "cd ~/www/avgust-td.ru/\r" 
}

expect "$ " { 
    puts "📥 Скачивание index.html..."
    send "wget -q -O index.html https://raw.githubusercontent.com/KyrgizBot/avgust-landing/main/index.html\r" 
}

expect "$ " { 
    puts "📥 Скачивание styles.css..."
    send "wget -q -O styles.css https://raw.githubusercontent.com/KyrgizBot/avgust-landing/main/styles.css\r" 
}

expect "$ " { 
    puts "📥 Скачивание script.js..."
    send "wget -q -O script.js https://raw.githubusercontent.com/KyrgizBot/avgust-landing/main/script.js\r" 
}

expect "$ " { 
    puts "🔒 Установка прав доступа..."
    send "chmod 644 *.html *.css *.js\r" 
}

expect "$ " { 
    puts "✅ Проверка файлов..."
    send "ls -lh index.html styles.css script.js\r" 
}

expect "$ " { 
    puts "\n✅ Деплой завершен!\n"
    send "exit\r" 
}

expect eof
puts "🎉 Сайт обновлен: http://avgust-td.ru/\n"
