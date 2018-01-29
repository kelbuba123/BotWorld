const search = require('youtube-search');
const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);
const yt = require('ytdl-core');

var opts = {
  maxResults: 1,
  key: ''
};

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
  message.guild.members.get(message.author.id).voiceChannel.leave();
  message.guild.members.get(message.author.id).voiceChannel.join();

  if(args[0].startsWith('https://youtube.com')){
    const stream = yt(args[0], { filter : 'audioonly' });
    let dispatcher = message.guild.members.get(message.author.id).voiceChannel.connection.playStream(stream, { seek: 0, volume: 1 });
    return {dispatcher, stream};
  }else{
    search(args.slice(0).join(' '), opts, function(err, results) {
      if(err) throw err;
      const stream = yt(results[0].link, { filter : 'audioonly' });
      let dispatcher = message.guild.members.get(message.author.id).voiceChannel.connection.playStream(stream, { seek: 0, volume: 1 });
      let embed = new Discord.RichEmbed()
      .setColor('#BBEEEE')
      .addField('Playing', results[0].title);
      message.channel.send(embed);
  });
  }
}

module.exports.help = {
    names: ['play'],
    usage: 'e-command <args>',
    description: 'what?'
}
