const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY);

export default async (req, res) => {
    if (req.method === 'POST') {
        const { first_name, last_name, email, subject } = req.body;

        const body = Object.keys(req.body)
            .map(key => {
                return `${key}: ${req.body[key]}`;
            })
            .join('<br><br>');

        const msg = {
            to: {
                name: `${first_name} ${last_name}`,
                email: process.env.NEXT_PUBLIC_SENDGRID_EMAIL,
            },
            from: {
                name: `${first_name} ${last_name}`,
                email,
            },
            replyTo: {
                name: `${first_name} ${last_name}`,
                email,
            },
            subject: subject || 'Contact Form Submission',
            html: body,
        };

        try {
            await sgMail.send(msg);
            return res.status(200).json({
                status: 'success',
                data: {
                    message: 'Email successfully sent',
                },
            });
        } catch (err) {
            return res.status(404).json({
                status: 'error',
                data: {
                    message: 'Something went very wrong!',
                },
            });
        }
    }

    return res.status(404).json({
        status: 'error',
        data: {
            message: 'Route not found',
        },
    });
};
