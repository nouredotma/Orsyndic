import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, service, message, to, subject } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Create transporter with Google SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app password
      },
    })

    // Create email content
    const emailContent = `
      Nouveau message de contact reçu :
      
      Nom: ${name}
      Email: ${email}
      Entreprise: ${company || 'Non spécifié'}
      Téléphone: ${phone || 'Non spécifié'}
      Service intéressé: ${service || 'Non spécifié'}
      
      Message:
      ${message}
      
      ---
      Ce message a été envoyé depuis le formulaire de contact de Orsyndic.
    `

    // HTML version for better formatting
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #226fd3;">Nouveau message de contact reçu</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Entreprise:</strong> ${company || 'Non spécifié'}</p>
          <p><strong>Téléphone:</strong> ${phone || 'Non spécifié'}</p>
          <p><strong>Service intéressé:</strong> ${service || 'Non spécifié'}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #226fd3; margin: 20px 0;">
          <h3 style="color: #226fd3; margin-top: 0;">Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          Ce message a été envoyé depuis le formulaire de contact de Orsyndic.
        </p>
      </div>
    `

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER, // Your Gmail address
      to: to || 'contact@orsyndic.com', // Default to contact@orsyndic.com
      subject: subject || `Nouveau message de contact - ${name}`,
      text: emailContent,
      html: htmlContent,
      replyTo: email, // Set reply-to as the sender's email
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)

    return NextResponse.json(
      { message: 'Email sent successfully', messageId: info.messageId },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
} 