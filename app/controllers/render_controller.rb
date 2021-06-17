class RenderController < ApplicationController
    def welcome
        render(:layout => "layouts/welcome")
    end

    def login
        render(:layout => "layouts/login")
    end

    def home
        @name = current_user.name
        @rooms = Room.all
        render(:layout => "layouts/home")
    end

    def chat
        @email = current_user.email
        @host = Room.find_by(room_id: params[:room_id]).host_email == current_user.email
        render(:layout => "layouts/chat")
    end
end