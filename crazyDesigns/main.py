# import turtle as t

# timmy_the_turtle = t.Turtle()
# # timmy_the_turtle.shape("turtle")
# # timmy_the_turtle.color("red")
# # timmy_the_turtle.forward(100)
# # timmy_the_turtle.backward(200)
# # timmy_the_turtle.right(90)
# # timmy_the_turtle.left(180)
# # timmy_the_turtle.setheading(0)


# for i in range(4):
#     timmy_the_turtle.forward(100)
#     timmy_the_turtle.right(90)

########### dashed line ###########
import turtle as t

tim = t.Turtle()


for i in range(20):
    tim.penup()
    tim.forward(5)
    tim.pendown()
    tim.forward(5)
