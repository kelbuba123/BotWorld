const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){

    function play(message, song){
        if(song!=undefined){
            message.channel.send(`Playing song **${song[0].title}** ` + '** Requested by: **' + song.from + '**');
            let stream = yt(song[0].link, { filter : 'audioonly', passes:3 });
            dispatcher = message.guild.voiceConnection.playStream(stream, { seek: 0, volume: 1 });
            dispatcher.once('end', function(){
              setTimeout(function(){
                bot.queue[message.guild.id].shift();
                play(message, bot.queue[message.guild.id][0]);
              }, 500);
            });
        }else{
            message.channel.send('No more songs, why not add more using b-queue <title>, and b-music play to start them :D.');
            message.guild.members.get(message.author.id).voiceChannel.leave();
        }
    }

    if(queue[message.guild.id].length<=0){
        message.channel.send('There are no songs queued! Queue some using b-music queue <song name>');
      }else{
        play(message, bot.queue[message.guild.id][0]);
      }
}

module.exports.help = {
    names: ['play'],
    usage: '-play',
    description: 'Start the music'
}
