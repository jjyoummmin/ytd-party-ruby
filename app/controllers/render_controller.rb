class RenderController < ApplicationController
    def welcome
        render(:layout => "layouts/welcome")
    end

    def login
        render(:layout => "layouts/login")
    end

    def home
        @rooms = Room.all
        print @rooms
        render(:layout => "layouts/home")
    end

    def chat
        @room_id = params[:room_id]
        @video_id = params[:video_id]
        render(:layout => "layouts/chat")
    end
end