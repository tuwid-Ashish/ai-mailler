const axios = require('axios');

const getEmailMessages = async (accessToken, queryText) => {
  try {
    console.log(`\n📬 Fou message(s):`);
    const response = await axios.get('https://api.aurinko.io/v1/email/messages', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: `text to:${queryText}`,
      },
    });

    console.log(`\n📬 Found ${response} message(s):`);

    const messages = response.data?.messages || [];

    console.log(`\n📬 Found ${messages.length} message(s):`);
    messages.forEach((msg, index) => {
      console.log(`\n🔹 Message #${index + 1}`);
      console.log(`ID       : ${msg.id}`);
      console.log(`Subject  : ${msg.subject}`);
      console.log(`From     : ${msg.from?.email} (${msg.from?.name})`);
      console.log(`To       : ${msg.to?.map(t => `${t.email} (${t.name})`).join(', ')}`);
      console.log(`Date     : ${msg.date}`);
      console.log(`Snippet  : ${msg.snippet?.slice(0, 100)}...`);
    });
  } catch (error) {
    console.error('❌ Failed to fetch messages:', error.response?.data || error.message);
  }
};

getEmailMessages('MBIQgG-8FR0Hi50Ui2hIm843ZjW-d9s8c08P2r5FLw8', 'text from:{notifications@stripe.com}');