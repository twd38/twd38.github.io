from flask import Flask, render_template, flash, redirect, url_for, session, request, logging
from data import Search
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators

app = Flask(__name__)

Search = Search()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search')
def search():
    return render_template('search.html', search=Search)



# @app.route('/<string:query>', methods=['GET','POST'])
# def results():
#     if request.method == 'POST':
#         # Get query
#         query =
#
#         # Create cursor
#         cur = mysql.connection.cursor()
#
#         # Get user by Username
#         result = cur.execute("SELECT * FROM users WHERE username = %s", [username])
#
#         if result > 0:
#             # Get stored hash
#             data = cur.fetchone()
#             password = data['password']
#
#             #compare Passwords
#             if sha256_crypt.verify(password_candidate, password):
#                 #Passed
#                 session['logged_in'] = True
#                 session['username'] = username
#
#                 flash('You are now logged in', 'success')
#                 return redirect(url_for('dashboard'))
#             else:
#                 error = 'Invalid Login'
#                 return render_template('login.html', error=error )
#             #Close Connection
#             cur.close()
#         else:
#             error = 'Invalid User'
#             return render_template('login.html', error=error )


if __name__ == '__main__':
    app.run(debug=True)
