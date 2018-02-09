// April Inc | SametTurkey - Altanay || 2018

const Discord = require("discord.js");
const os = require("os")
const url = require("url")
const delay = require("delay")
require("dotenv").config()

const Prefix = process.env.prefix

var bot = new Discord.Client();

const CSGOResimleri = [
	"https://i.hizliresim.com/oOzYkX.gif", // CSGO
	"https://i.hizliresim.com/gOL46Z.gif", // CSGO
	"https://i.hizliresim.com/gOL4rZ.gif", // CSGO
	"https://i.hizliresim.com/z0E2Lg.gif"
]

const KediResimleri = [
	"https://i.hizliresim.com/z0EgVB.gif", // Kedi
	"https://i.hizliresim.com/G91Eky.gif", // Kedi
	"https://i.hizliresim.com/y0nml0.gif", // Kedi
	"https://i.hizliresim.com/6J6QkN.gif", // Kedi
	"https://i.hizliresim.com/W7r4Zq.gif", // Kedi
	"https://i.hizliresim.com/3ERNaO.gif"
]


bot.on("ready", function(login) {
    console.log("Hazır!");
    console.log(bot.user.username + "#" + bot.user.discriminator + " ismiyle giriş yapıldı!");
    bot.user.setGame("discord.gg/Ea6aUCG", 'https://www.twitch.tv/melihkardes', 1);
});

bot.on("error", function(error) {
	console.log(error)
});

bot.on("warn", function(warn) {
	console.log(warn)
});

bot.on("guildCreate", function(guild) {
    if (DevreDisiGuildler.includes(guild.id)) return;
    if (guild.channels.first().type == "text") {
        guild.channels.first().send("Beni sunucunuza eklediğiniz için teşekkür ederim! Birkaç bilgi istiyorsanız :robot:, " + os.EOL + "**-** `c!yardim` komutu size komutları gösterir." + os.EOL + "**-** `c!bilgi` komutu size bot hakkında bilgi verir." + os.EOL + "**-** Ayrıca botumuzun discord sunucusunada katılmayı unutmayın! https://discord.gg/eEm46bW");
    }
    //var con = mysql.createConnection({
    //    host: process.env.VERITABANI_IP,
    //    port: 3307,
    //    user: process.env.VERITABANI_KULLANICI,
    //    password: process.env.VERITABANI_PAROLA,
    //    database: "" + process.env.BOT_NAME + "discord"
    //});
    //con.connect(function(err) {
    //    var sql = "CREATE TABLE `" + process.env.BOT_NAME + "discord`.`server-" + guild.id + "` ( `id` VARCHAR(18) NOT NULL DEFAULT '0' , `level` VARCHAR(18) NOT NULL DEFAULT '0' ) ENGINE = InnoDB;"
    //    con.query(sql, function(err) {
    //        if (err) console.log(err);
    //    });
    //});
    bot.user.setGame("discord.gg/Ea6aUCG", 'https://www.twitch.tv/melihkardes', 1);
});

bot.on("guildDelete", function(guild) {
    //var con = mysql.createConnection({
    //    host: process.env.VERITABANI_IP,
    //    port: 3307,
    //    user: process.env.VERITABANI_KULLANICI,
    //    password: process.env.VERITABANI_PAROLA,
    //    database: "" + process.env.BOT_NAME + "discord"
    //});
    //con.connect(function(err) {
    //    var sql = "DROP TABLE `" + process.env.BOT_NAME + "discord`.`" + guild.id + "`"
    //    con.query(sql, function(err) {
    //        if (err) console.log(err);
    //    });
    //});
    bot.user.setGame("c!yardim | 1/1 | " + bot.guilds.size + " sunucu!", 'https://www.twitch.tv/turkishtr2', 1);
});

bot.on("guildMemberAdd", function(member) {
    if (DevreDisiGuildler.includes(member.guild.id)) return;
    if (member.guild.channels.first().type == "text") {
        member.guild.channels.first().send("| :inbox_tray: | **" + member.user.username + "** Sunucuya Giriş Yaptı!");
    }
});

bot.on("guildMemberLeave", function(member) {
    if (DevreDisiGuildler.includes(member.guild.id)) return;
    if (member.guild.channels.first().type == "text") {
        member.guild.channels.first().send("| :outbox_tray: | **" + member.user.username + "** Sunucudan Ayrıldı!");
    }
});

bot.on("roleUpdate", function(oldrole, newrole) {
    if (DevreDisiGuildler.includes(newrole.guild.id)) return;
    if (newrole.guild.channels.first().type == "text") {
        if (newrole.name != oldrole.name || newrole.permissions != oldrole.permissions) {
             var embed = new Discord.RichEmbed()
            .setAuthor("Rol Güncellemesi", newrole.guild.iconURL)
            .addField("**>**  Eski Rol İsmi", oldrole.name, true)
            .addField("**>**  Eski Rol Yetkileri", oldrole.permissions, true)
            .addField("**>**  Yeni Rol İsmi", newrole.name, true)
            .addField("**>**  Yeni Rol Yetkileri", newrole.permissions, true)
            
            .setThumbnail(newrole.guild.iconURL)
            
            newrole.guild.channels.first().send(embed);
        }
    }
});

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (message.content.startsWith(Prefix)) {
    try {

    var args = message.content.substring(Prefix.length).split(" ")

    switch (args[0].toLowerCase().replace("ı", "i").replace("ü", "u").replace("ş", "s").replace("ç", "c")) {
        case "yasakla":
            const kullanici = args[1]
            let member = message.mentions.members.first();
            if (!message.member.roles.some(r=>["BanMembers"].includes(r.name))) {
                if (!args[1] == "") {
                    const sebep = args.join(" ").replace(args[0], "").replace(args[1], "")
                    if (!args[2] == "") {
                        if (!member) {
                            return message.channel.send("**Kullanıcı bulunamadı!**");
                        }
                        if (member.bannable) {
                            member.ban(sebep)
                            message.channel.send("<@" + member.id + ">, **sunucudan başarıyla `" + sebep + "` sebebiyle yasaklandı!**");
                            var embed = new Discord.RichEmbed()
                                .setAuthor("" + process.env.BOT_NAME + " - Yasaklama", bot.user.avatarURL)
                                .setDescription(message.guild.name + "sunucusundan yasaklandınız!")
                                .addField("**>**  **YASAKLAYAN: **" + "<@" + message.author.id + ">", "**SEBEP: **" + sebep)
                                
                                .setThumbnail(message.author.avatarURL)
                                
                            member.user.send(embed);
                        }
                        else {
                            message.channel.send("**Kullanıcı yasaklanamıyor. Kullanıcının yetkisi daha yüksek olabilir!**");
                        }
                    }
                    else {
                        message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                    }
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            break
        case "at":
            const atilacakkullanici = args[1]
            let atilacakmember = message.mentions.members.first();
            if (!message.member.roles.some(r=>["KickMembers"].includes(r.name))) {
                if (!args[1] == "") {
                    const sebep = args.join(" ").replace(args[0], "").replace(args[1], "")
                    if (!args[2] == "") {
                        if (!atilacakmember) {
                            return message.channel.send("**Kullanıcı bulunamadı!**");
                        }
                        if (atilacakmember.bannable) {
                            atilacakmember.kick(sebep)
                            message.channel.send("<@" + atilacakmember.id + ">, **sunucudan başarıyla `" + sebep + "` sebebiyle atıldı!**");
                        }
                        else {
                            message.channel.send("**Kullanıcı yasaklanamıyor. Kullanıcının yetkisi daha yüksek olabilir!**");
                        }
                    }
                    else {
                        message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                    }
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            break
        case "slots":
            var esyalar = [
                ":moneybag: ",
                ":dollar: ",
                ":euro: ",
                ":pound: ",
                ":money_with_wings: ",
                ":gem: ",
                ":yen: "
            ]
            var item1 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item2 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item3 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item4 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item5 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item6 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item7 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item8 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item9 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var slots = message.channel.send(item1 + item2 + item3 + os.EOL + item4 + item5 + item6 + "<" + os.EOL + item7 + item8 + item9 + os.EOL + "----------").then((msg) =>
            {
                delay(750).then(() => {
                    msg.edit(item4 + item5 + item6 + os.EOL + item7 + item8 + item9 + "<" + os.EOL + item1 + item2 + item3 + os.EOL + "----------")
                    delay(750).then(() => {
                        msg.edit(item7 + item8 + item9 + os.EOL + item1 + item2 + item3 + "<" + os.EOL + item4 + item5 + item6 + os.EOL + "----------")
                        delay(750).then(() => {
                            msg.edit(item1 + item2 + item3 + os.EOL + item4 + item5 + item6 + "<" + os.EOL + item7 + item8 + item9 + os.EOL + "----------")
                            delay(750).then(() => {
                                if (item4 == item5 && item5 == item6) {
                                    msg.edit(item1 + item2 + item3 + os.EOL + item4 + item5 + item6 + "<" + os.EOL + item7 + item8 + item9 + os.EOL + "KAZANDIN")
                                }
                                else {
                                    msg.edit(item1 + item2 + item3 + os.EOL + item4 + item5 + item6 + "<" + os.EOL + item7 + item8 + item9 + os.EOL + "KAYBETTIN")
                                }
                            })
                        })
                    })
                })
            });
            break
        case "avatar":
            var embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                
                .setImage(message.author.avatarURL)
                
            message.channel.send(embed)
            break
        case "hataverdirme":
            throw new Error("İsteğe bağlı hata verdirildi!")
            break
        case "oylama":
            if (!args[1] == "") {
                if (message.member.roles.some(r=>["Administrator"].includes(r.name))) {
                    var oylama = args.join(" ").replace(args[0], "").replace("undefined", "")
                    var embed = new Discord.RichEmbed()
                        .setAuthor("Oylama", message.guild.iconURL)
                        .addField("**>** Konu", oylama)
                        
                        
                    message.channel.send(embed).then((oylamamessage) =>
                    {
                        oylamamessage.react("✅")
                        oylamamessage.react("❌")
                    });
                }
                else {
                    message.delete()
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "host":
            var embed = new Discord.RichEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .addField("**>**  Bit", os.arch(), true)
                .addField("**>**  Sürüm", os.release(), true)
                .addField("**>**  Platform", os.type(), true)
                
                .setThumbnail(bot.user.avatarURL)
                
            message.channel.send(embed)
            break
        case "konustur":
            var konustur = args.join(" ").replace(args[0], "")
            if (!args[1] == "") {
                message.delete()
                message.channel.send(konustur);
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "kurallar":
            var embed = new Discord.RichEmbed()
                .setTitle(":closed_book: Kurallar")
                .addField("**>**  :point_right: Küfür Yasaktır", "**---------------------------------**")
                .addField("**>**  :point_right: Argo Yasaktır", "**---------------------------------**")
                .addField("**>**  :point_right: Reklam Yasaktır", "**---------------------------------**")
                
                
            message.channel.send(embed)
            break
        case "sorusor":
            if (!args[1] == "") {
                var soru = args.join(" ").replace(args[0]).replace(" ", "").replace("undefined", "")
                var cevaplar = [
                    "Evet",
                    "Hayır",
                    "Belki",
                    "Olabilir"
                ]
                var embed = new Discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .addField("**>**  Soru", soru, false)
                    .addField("**>**  Cevap", cevaplar[Math.floor(Math.random() * cevaplar.length)], true)
                    
                    
                message.channel.send(embed)
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
		case "sunucubilgisi":
		if (!message.guild) return message.channel.send("**Özel mesaj ile bu komut kullanılamaz!**");
            var embed = new Discord.RichEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL)
                .addField("**>**  ID", message.guild.id, true)
                .addField("**>**  İsim", message.guild.name, true)
                .addField("**>**  Sahibi", "<@" + message.guild.owner.id + ">" + ", (" + message.guild.owner.id + ")", true)
                .addField("**>**  Bölge", message.guild.region, true)
                .addField("**>**  Kanallar", message.guild.channels.size, true)
                .addField("**>**  Üyeler", message.guild.memberCount, true)
                .addField("**>**  Roller", message.guild.roles.size, true)
                .addField("**>**  Ana Kanalı", "<#" + message.guild.channels.first().id + ">", true)
                .addField("**>**  Zaman Aşımı Süresi", message.guild.afkTimeout + " saniye", true)
                .addField("**>**  Doğrulama Seviyesi", message.guild.verificationLevel.toString().replace("0", "Yok").replace("1", "Düşük").replace("2", "Orta").replace("3", "(╯°□°）╯︵ ┻━┻").replace("4", "┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻"), true)
                .addField("**>**  Sakıncalı İçerik Filtresi", message.guild.explicitContentFilter.toString().replace("true", "Etkin").replace("false", "Devre Dışı"), true)
                .addField("**>**  Oluşturulma Tarihi", message.guild.createdAt, false)
                .setColor(3447003)
                .setFooter("" + process.env.BOT_NAME + " | April Inc. " + new Date(), bot.user.avatarURL)
                .setThumbnail(message.guild.iconURL)
            message.channel.send(embed)
            break
        case "sunucuikon":
	    if (!message.guild) return message.channel.send("**Özel mesaj ile bu komut kullanılamaz!**");
            var embed = new Discord.RichEmbed()
                .setImage(message.guild.iconURL)
                
            message.channel.send(embed);
            break
		case "ping":
			var ping = message.channel.send("Ping!").then((pinglatency) => {
				var latency = pinglatency.createdTimestamp - message.createdTimestamp
				pinglatency.edit("**Gecikme Süresi: `" + latency + "ms`**")
			});
	    break
        case "bilgi":
            var embed = new Discord.RichEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .addField("**>**  Yapımcı", "-")
                .addField("**>**  Yapımcılar", "-")
                .addField("**>**  Altyapı", "<@386913390779432960> (<@273453450019471361>)")
                .addField("**>**  Sürüm", "Yok")
                .addField("**>**  Resmi Sunucu", "-")
                .addField("**>**  Davet Linki", "-")
                .setColor(3447003)
                .setThumbnail(bot.user.avatarURL)
                .setFooter("" + process.env.BOT_NAME + " | April Inc. " + new Date(), bot.user.avatarURL)
            message.channel.send(embed)
            break
        case "davetolustur":
            if (message.member.roles.some(r=>["CreateInstantInvite"].includes(r.name))) {
                message.channel.createInvite().then(invite =>
                    message.channel.send(":white_check_mark: **Başarılı! **" + invite.url)
                );
            }
            else {
                message.delete()
            }
            break
		case "csgo":
			var embed = new Discord.RichEmbed()
				.setTitle("<:csgo:401045015289135114> CSGO")
				.setImage(CSGOResimleri[Math.floor(Math.random() * CSGOResimleri.length)])
				.setColor(3447003)
			message.channel.send(embed);
			break
		case "kedi":
			var embed = new Discord.RichEmbed()
				.setTitle("<:kedi:401053333898395649> Kedi")
				.setImage(KediResimleri[Math.floor(Math.random() * KediResimleri.length)])
				.setColor(3447003)
			message.channel.send(embed);
			break
        case "temizle":
            if (!args[1] == "") {
                if (message.member.roles.some(r=>["Manage Messages"].includes(r.name))) {
                    var temizle = parseInt(args[1])
                    if (temizle > 100)
                    return message.channel.send("**Mesaj silme sınırı 100'dür!**");
                    if (temizle < 2)
                    return message.channel.send("**Minimum 2 mesaj silinebilir!**");
                    message.channel.bulkDelete(temizle)
                    message.channel.send(":white_check_mark: **" + temizle + "**");
                }
                else {
                    message.delete()
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "yardim":
            var embed = new Discord.RichEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .setTitle("<:yardim:401040634745454597> Yardım Komutları")
                .addField("**>**  Komutlar", "temizle" + os.EOL +
				"ban" + os.EOL + 
				"kick" + os.EOL + 
				"**Resim-Gif**" + os.EOL + 
				"csgo" + os.EOL + 
				"kedi" + os.EOL + 
				"**Eğlence**" + os.EOL + 
				"avatar" + os.EOL + 
				"konuştur" + os.EOL + 
				"sorusor" + os.EOL + 
				"slots" + os.EOL + 
				"**Bilgi**" + os.EOL + 
				"yardım" + os.EOL + 
				"bilgi" + os.EOL + 
				"hosting" + os.EOL + 
				"sunucubilgisi" + os.EOL + 
				"**Diğer**" + os.EOL + 
				"zaman" + os.EOL + 
				"ping" + os.EOL + 
				"sunucuikon" + os.EOL + 
				"davetoluştur")
                
                .setThumbnail(bot.user.avatarURL)
                message.react("🤖")
                message.react("❔")
                message.react("💖")
                message.author.send(embed);
		message.channel.send("**<@" + message.author.id + ">, yardım komutlarını direkt mesaj olarak yolladım!** :mailbox_with_mail:");
                break
        case "zaman":
            var embed = new Discord.RichEmbed()
                .setTitle(":clock4: Zaman")
                .addField("**>**  Saat", new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(), true)
                .addField("**>**  Tarih", new Date(), false)
                
                
                .setThumbnail(bot.user.avatarURL)
            message.channel.send(embed);
            break
        default:
            message.channel.send("**Bilinmeyen komut!**");
    }
    }
    catch (err) {
        message.channel.send("<@" + message.author.id + ">, **komut kullanırken bir hata oluştu: " + os.EOL + "`" + err + "`" + os.EOL + os.EOL + "Lütfen bildirin! <@273453450019471361>, <@293006152692662273>**");
    }
    }
    else {
    
    // if (!message.author.bot) {
        // if (!levels[message.guild.id]) levels[message.guild.id] = {
        //    
        // }
        // if (!levels[message.guild.id][message.author.id]) levels[message.guild.id][message.author.id] = {
        //     level : 0
        // };
        // levels[message.guild.id][message.author.id].level++
        //
        // fs.writeFile("./levels.json", JSON.stringify(levels), (err) => {
        //     if (err) console.error(err)
        // });
    //}
        
    if (message.content.toLowerCase() == "merhaba") {
        message.react("👋")
        message.channel.send("**Merhaba**, <@" + message.author.id + ">!");
    }

    if (message.content.toLowerCase() == "sa") {
        message.react("👋")
        message.channel.send("**Aleyküm Selam**, <@" + message.author.id + ">!");
    }

    if (message.content.toLowerCase() == "iyi geceler") {
        message.react("🌝")
        message.channel.send("**İyi Geceler**, <@" + message.author.id + ">!");
    }

    if (message.content.toLowerCase().startsWith("teyzen")) {
        message.react("😂")
        message.channel.send("**Yok Baban** :smile:, <@" + message.author.id + ">!");
    }

    if (message.content.toLowerCase().indexOf("discord.gg/") > -1) {
        if (!message.author.bot) {
            message.react("😡")
            message.delete()
            message.channel.send("<@" + message.author.id + ">, **lütfen reklam yapma!**");
        }
    }

    if (message.content.toLowerCase().indexOf("https") > -1 || message.content.toLowerCase().indexOf("http") > -1) {
        if (message.content.toLowerCase().indexOf("discord.gg/") > -1) {
            if (message.author.bot == false) {
                message.react("😡")
                message.delete()
                message.channel.send("<@" + message.author.id + ">, **lütfen reklam yapma!**");
            }
        }
        else {
            if (message.author.bot == false) {
                message.react("😡")
                message.delete()
                message.channel.send("<@" + message.author.id + ">, **lütfen URL'leri özelden paylaş!**");
            }
        }
    }

    if (message.content.toLowerCase().indexOf("küfür") > -1 ||
    message.content.toLowerCase().indexOf("siktir") > -1 ||
    message.content.toLowerCase().indexOf("sikerim") > -1 ||
    message.content.toLowerCase().indexOf("amına") > -1 ||
    message.content.toLowerCase().indexOf("amina") > -1 ||
    message.content.toLowerCase().indexOf("amcık") > -1 ||
    message.content.toLowerCase().indexOf("amcik") > -1 ||
    message.content.toLowerCase().indexOf("ananı") > -1 ||
    message.content.toLowerCase().indexOf("ecdadını") > -1 ||
    message.content.toLowerCase().indexOf("sikiyim") > -1 ||
    message.content.toLowerCase().indexOf("orospu") > -1 ||
    message.content.toLowerCase().indexOf("orospu çocuğu") > -1 ||
    message.content.toLowerCase().indexOf("yarrak") > -1 ||
    message.content.toLowerCase().indexOf("pipi") > -1 ||
    message.content.toLowerCase().indexOf("göt") > -1 ||
    message.content.toLowerCase().indexOf("götveren") > -1 ||
    message.content.toLowerCase().indexOf("göt veren") > -1 ||
    message.content.toLowerCase().indexOf("bok") > -1 ||
    message.content.toLowerCase().indexOf("piç") > -1 ||
    message.content.toLowerCase().indexOf(" amk") > -1 ||
    message.content.toLowerCase().indexOf(" mk") > -1) {
        if (!message.channel.nsfw) {
            if (message.author.bot == false) {
                message.react("😠")
                message.delete()
                message.channel.send("<@" + message.author.id + ">, **lütfen küfür etme!**");
            }
        }
    }
    }
});

bot.login(process.env.BOT_TOKEN);
